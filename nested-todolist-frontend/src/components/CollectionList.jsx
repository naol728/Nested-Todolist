import React from "react";

export default function CollectionList({ collection }) {
  return (
    <div>
      <h3 className="text-xl text-light-foreground dark:text-dark-foreground font-semibold">
        {collection.icon} {collection.name}
      </h3>
      <p className="text-light-secondary dark:text-dark-muted text-sm">
        {collection.tasks_done}/{collection.tasks_total} done
      </p>
    </div>
  );
}
