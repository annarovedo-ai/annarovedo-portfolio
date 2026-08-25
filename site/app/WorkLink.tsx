/**
 * The one Work link that knows where the work actually lives.
 *
 * Used to branch by persona (a Client's grid lived on /studio#client-work,
 * everyone else's on /#work). As of 2026-08-20 /work is a real page with the
 * full six case studies for every persona, so there is one destination and no
 * persona read is needed any more. Kept as its own component anyway: the
 * breadcrumb and anything else that links "back to the work" still resolve
 * that question in one place instead of each hardcoding the route.
 */
export default function WorkLink({
  className,
  onClick,
  children = "Work",
}: {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <a href="/work" className={className} onClick={onClick}>
      {children}
    </a>
  );
}
