export default function Avatar({ src, alt, onClick }) {
  return (
    <div
      className="flex items-center space-x-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-10 h-10">
        <img
          src={
            src ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3oPvKsA05otgZYGFZmxk5WHLYTFKWOFaNA&s"
          }
          alt={alt || "User Avatar"}
          className="w-full h-full rounded-full border-2 border-light-border dark:border-dark-border object-cover"
        />
      </div>
    </div>
  );
}
