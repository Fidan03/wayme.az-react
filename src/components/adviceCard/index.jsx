const AdviceCard = ({ data }) => {
  const resources = data?.resources || {};
  const onlineCourses = resources?.onlineCourses || [];
  const youtubeChannels = resources?.youtubeChannels || [];
  const books = resources?.books || [];

  return (
    <div className="bg-[#2F4A73] rounded-2xl p-6 flex flex-col gap-6 w-full">
      <p className="text-white font-bold text-[22px]">Tövsiyyə olunan resurslar</p>

      <div className="flex flex-col gap-4">
        <div className="bg-background rounded-xl p-5 flex flex-col gap-3">
          <p className="text-white font-semibold text-xl">Online kurslar</p>
          <div className="flex flex-col gap-1">
            {onlineCourses.length ? (
              onlineCourses.map((c, idx) => (
                <p key={idx} className="text-[#A2A8B2]">
                  {idx + 1}. {c.title} -{" "}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2AA6FF] underline cursor-pointer"
                  >
                    Link
                  </a>
                </p>
              ))
            ) : (
              <p className="text-[#A2A8B2]">Resurs yoxdur</p>
            )}
          </div>
        </div>

        <div className="bg-background rounded-xl p-5 flex flex-col gap-3">
          <p className="text-white font-semibold text-xl">Youtube kanalları</p>
          <div className="flex flex-col gap-1">
            {youtubeChannels.length ? (
              youtubeChannels.map((c, idx) => (
                <p key={idx} className="text-[#A2A8B2]">
                  {idx + 1}. {c.title} -{" "}
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2AA6FF] underline cursor-pointer"
                  >
                    Link
                  </a>
                </p>
              ))
            ) : (
              <p className="text-[#A2A8B2]">Resurs yoxdur</p>
            )}
          </div>
        </div>

        <div className="bg-background rounded-xl p-5 flex flex-col gap-3">
          <p className="text-white font-semibold text-xl">Kitab tövsiyyələri</p>
          <div className="flex flex-col gap-1">
            {books.length ? (
              books.map((b, idx) => (
                <p key={idx} className="text-[#A2A8B2]">
                  {idx + 1}. {b.title} -{" "}
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2AA6FF] underline cursor-pointer"
                  >
                    Link
                  </a>
                </p>
              ))
            ) : (
              <p className="text-[#A2A8B2]">Resurs yoxdur</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceCard;