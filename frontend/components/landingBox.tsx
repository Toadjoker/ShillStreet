const LandingBox = () => {
  return (
    <div className="flex flex-col items-center justify-start w-1/4 h-1/2">
      <div className="bg-logo bg-cover bg-center w-40 h-40 rounded-full" />
      <div className="my-5 space-y-3">
        <p className="text-center text-xl text-gray-500">
          Provide Email For Private Beta
        </p>
        <div className="h_line"></div>
        <input
          type="email"
          className="w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400"
        />
      </div>
    </div>
  );
};

export default LandingBox;
