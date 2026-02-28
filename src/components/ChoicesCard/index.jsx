const ChoicesCard = ({ onSelect, selectedSkills, choices = [] }) => {
  // Filter out already selected skills
  const filteredChoices = choices.filter(
    (item) => !selectedSkills.includes(item.name || item.title)
  );

  // If no API data, render nothing
  if (!choices || choices.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 my-5 justify-center">
      {filteredChoices.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.name || item.title)}
          className="
            border-[#2F4A73] border-2
            text-[#A2A8B2]
            px-5 py-4
            rounded-[7px]
            cursor-pointer
            hover:bg-[#2F4A73]
            hover:text-white
            transition
          "
        >
          {item.name || item.title}
        </div>
      ))}
    </div>
  );
};

export default ChoicesCard;