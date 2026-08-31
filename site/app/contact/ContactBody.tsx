"use client";

import { useState } from "react";
import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "../personaStore";
import { contactContent } from "../pageContent";
import SiteHeader from "../SiteHeader";
import SiteFooter from "../SiteFooter";

/**
 * Submissions POST to a form relay service. Two supported setups:
 *
 *   Web3Forms  NEXT_PUBLIC_FORM_ACCESS_KEY=<your access key>
 *   Formspree  NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/<id>
 *
 * With neither configured the form falls back to opening the visitor’s mail
 * client with the message pre-filled, so it never silently does nothing.
 */
const ACCESS_KEY = import.meta.env.NEXT_PUBLIC_FORM_ACCESS_KEY;
const ENDPOINT =
  import.meta.env.NEXT_PUBLIC_FORM_ENDPOINT ??
  (ACCESS_KEY ? "https://api.web3forms.com/submit" : undefined);
const FALLBACK_EMAIL = "anna.rovedo@gmail.com";

type Status = "idle" | "submitting" | "success" | "error";

function fieldId(label: string) {
  return label.replace(/\W+/g, "-").toLowerCase();
}

function isEmailField(label: string) {
  return /email|reply|send a validation/i.test(label);
}

export default function ContactBody() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  /**
   * Ex reads its own copy again as of 2026-08-31. This line used to be
   * `store === "ex" ? "recruiter" : store`, added 2026-08-19 under "utility
   * pages serve the Recruiter content" — but a full ex block already existed
   * in pageContent (House Rules, the 140-character filter, "up to 3 business
   * years"), so the override was silently throwing it away. Two commits on
   * 2026-08-27 then wrote MORE ex contact copy on top of an override that was
   * already discarding it, which is how a whole persona's page went eleven
   * days without ever rendering.
   *
   * /resume never did this — it reads `store` directly and has its own ex
   * block. Contact was the only page treating ex as a redirect.
   */
  const persona = store;
  const c = contactContent[persona];

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate() {
    const next: Record<string, string> = {};
    for (const f of c.fields) {
      const v = (values[f.label] ?? "").trim();
      if (!v) {
        next[f.label] = "This one is required.";
      } else if (isEmailField(f.label) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        next[f.label] = "That does not look like an email address.";
      }
    }
    setErrors(next);

    /* Focus moves to the first invalid field. Without this, a failed submit
       left focus on the button: the inline errors and aria-invalid were
       correct, but nothing announced them, so a screen-reader user pressed
       Send and heard silence. Landing focus in the field reads its label,
       its invalid state and its error in one move. rAF because the error
       nodes render on the next commit. */
    const firstBad = c.fields.find((f) => next[f.label]);
    if (firstBad) {
      requestAnimationFrame(() => {
        document.getElementById(fieldId(firstBad.label))?.focus();
      });
    }
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    const payload: Record<string, string> = {
      ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
      subject: `Website enquiry (${c.eyebrow})`,
      persona,
      ...Object.fromEntries(c.fields.map((f) => [f.label, values[f.label] ?? ""])),
    };

    if (!ENDPOINT) {
      // No form service configured: hand off to the visitor’s mail client.
      const body = c.fields
        .map((f) => `${f.label}\n${values[f.label] ?? ""}`)
        .join("\n\n");
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
        `Website enquiry (${c.eyebrow})`
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
      setValues({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="contact-page">
      <SiteHeader />

      <article id="top">
        <section className="contact-top shell" data-anna-prompt="What happens after I send this?" data-anna-prompt-ex="Should I just text you instead?">
          <p className="contact-eyebrow">
            {c.eyebrow}
            <span aria-hidden="true" />
          </p>
          <h1>{c.headline}</h1>
          <p className="contact-deck">{c.deck}</p>
        </section>

        <section className="contact-grid shell" data-anna-prompt="What should I include in the message?" data-anna-prompt-client="What makes a messy brief useful?" data-anna-prompt-ex="What should I absolutely not write here?">
          {status === "success" ? (
            <div className="contact-success" role="status">
              <h2>Thank you. That has been sent.</h2>
              <p>
                I read everything myself and usually reply within a couple of days. If it is
                urgent, the calendar link below is faster.
              </p>
              <a href="https://calendly.com/anna-rovedo/30min">Book 30 minutes instead &rarr;</a>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {c.fields.map((f) => {
                const id = fieldId(f.label);
                const err = errors[f.label];
                return (
                  <div className="contact-field" key={f.label}>
                    <label htmlFor={id}>{f.label}</label>
                    {f.multiline ? (
                      <textarea
                        id={id}
                        name={id}
                        rows={4}
                        placeholder={f.placeholder}
                        value={values[f.label] ?? ""}
                        aria-invalid={err ? true : undefined}
                        aria-describedby={err ? `${id}-error` : undefined}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, [f.label]: e.target.value }))
                        }
                      />
                    ) : (
                      <input
                        id={id}
                        name={id}
                        autoComplete={
                          isEmailField(f.label)
                            ? "email"
                            : /name/i.test(f.label)
                              ? "name"
                              : /company|organisation|organization/i.test(f.label)
                                ? "organization"
                                : undefined
                        }
                        type={isEmailField(f.label) ? "email" : "text"}
                        placeholder={f.placeholder}
                        value={values[f.label] ?? ""}
                        aria-invalid={err ? true : undefined}
                        aria-describedby={err ? `${id}-error` : undefined}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, [f.label]: e.target.value }))
                        }
                      />
                    )}
                    {err ? (
                      <p className="contact-error" id={`${id}-error`}>
                        {err}
                      </p>
                    ) : null}
                  </div>
                );
              })}

              <button
                type="submit"
                className="contact-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : c.submit}
              </button>

              {status === "error" ? (
                <p className="contact-error contact-error-form" role="alert">
                  Something went wrong sending that. You can email me directly at{" "}
                  <a href={`mailto:${FALLBACK_EMAIL}`}>{FALLBACK_EMAIL}</a>.
                </p>
              ) : null}

              <p className="contact-alt">
                Or book a call on{" "}
                <a href="https://calendly.com/anna-rovedo/30min">Calendly</a> to start a
                conversation immediately.
              </p>
            </form>
          )}

          <aside className="contact-side">
            <h2>{c.sideHeading}</h2>
            <p>{c.sideBody}</p>

            {c.channels?.map((ch) => (
              <div className="contact-channel" key={ch.label}>
                <span>{ch.label}</span>
                <a href={ch.href}>{ch.value}</a>
              </div>
            ))}

            {c.sideList ? (
              <ol className="contact-side-list">
                {c.sideList.map((item, i) => (
                  <li key={item.label}>
                    <span>{item.ordered ? i + 1 : "!"}</span>
                    {item.label}
                  </li>
                ))}
              </ol>
            ) : null}
          </aside>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
