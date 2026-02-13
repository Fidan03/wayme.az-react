import choice from "../../data/easyChoices";

const ChoicesCard = () => {
  return (
    <div className="flex flex-wrap gap-3 my-5 justify-center">
      {choice.map((item) => (
        <div
          key={item.id}
          className="border-[#2F4A73] border-[2px] text-#A2A8B2 px-5 py-4 rounded-[7px] text-[16px] cursor-pointer"
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default ChoicesCard;
