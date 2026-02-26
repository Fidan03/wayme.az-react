import choice from "../../data/easyChoices";

const ChoicesCard = ({ onSelect, selectedSkills, choices = [] }) => {
  // Use API choices if available, otherwise local data
  const dataSource = choices.length > 0 ? choices : choice;

  // Filter out already selected skills
  const filteredChoices = dataSource.filter(
    (item) => !selectedSkills.includes(item.name || item.title)
  );

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