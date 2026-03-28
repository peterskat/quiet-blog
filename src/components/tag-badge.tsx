type TagBadgeProps = {
  tag: string;
};

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-stone-300 px-3 py-1 text-xs tracking-wide text-stone-600">
      {tag}
    </span>
  );
}
