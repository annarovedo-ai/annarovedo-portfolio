import { redirect } from "next/navigation";

/**
 * The work index was folded back into the homepage: with four case studies a
 * separate index page duplicated the homepage almost exactly. This redirect
 * keeps any existing links working.
 */
export default function Work() {
  redirect("/#work");
}
