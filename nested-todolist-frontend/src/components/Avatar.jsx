export default function Avatar({ src, alt }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative w-10 h-10">
        <img
          src={
            src ||
            "https://media.licdn.com/dms/image/v2/D4E03AQHJHHbVxpFVeA/profile-displayphoto-shrink_100_100/B4EZWZFqN9HMAU-/0/1742030154552?e=1748476800&v=beta&t=IFd64FFBADswjn6ekTmH7HBJZvMVlfCZ6XVEwLd-IVM"
          }
          alt={alt || "User Avatar"}
          className="w-full h-full rounded-full border-2 border-light-border dark:border-dark-border object-cover"
        />
      </div>
    </div>
  );
}
