import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
};

const LandingBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-start w-1/4 h-1/2"
    >
      {/* image and button section */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="bg-logo bg-cover bg-center w-40 h-40 rounded-full mb-5" />
        <button
          className="bg-blue-500 p-2 rounded-full w-20 shadow-md hover:bg-blue-600 text-white"
          type="submit"
        >
          Submit
        </button>
      </div>

      {/* instruction text and input field section */}
      <div className="my-5 space-y-3">
        <p className="text-center text-xl text-gray-500">
          Provide Email For Private Beta
        </p>
        <div className="h_line"></div>
        <input
          type="email"
          placeholder="youremail@example.com"
          className="w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400"
          {...register("email", { required: "This field is required" })}
        />

        {errors.email && (
          <span className="text-red-400 text-center">
            {errors.email?.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default LandingBox;
