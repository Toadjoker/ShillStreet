import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  // walletAddress: string;
  // privateString: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="-mt-5 w-auto">
      <p className="text-center text-xl font-semibold mb-5 text-gray-500">
        Sign Up
      </p>
      <input
        type="name"
        placeholder="your name"
        className="w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-3"
        {...register("name", { required: "This field is required" })}
      />
      <input
        type="email"
        placeholder="youremail@example.com"
        className="w-full h-8 rounded-sm p-4 text-gray-500 border-2 border-gray-400 my-3"
        {...register("email", { required: "This field is required" })}
      />
      <div className="flex justify-center items-center my-3">
        <button
          className="bg-blue-500 p-2 rounded-full w-32 shadow-md hover:bg-blue-600 text-white"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
