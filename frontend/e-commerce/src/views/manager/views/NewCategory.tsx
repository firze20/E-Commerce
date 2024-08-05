import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateCategoryMutation } from "@/hooks/manager/useCreateCategoryMutation";
import { CategoryCreationParams } from "@/api/manager/managerApi";
import LazySpinner from "@/components/common/loading/LazySpinner";

const NewCategory = () => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<CategoryCreationParams>();

  const createCategoryMutation = useCreateCategoryMutation();

  const onSubmit: SubmitHandler<CategoryCreationParams> = (
    data: CategoryCreationParams
  ) => {
    createCategoryMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="category-name">
          <span className="label-text">Category name:</span>
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          id="category-name"
          className="input input-bordered"
          placeholder="Category name"
        />
        <label htmlFor="category-description">
          <span className="label-text">Category description:</span>
        </label>
        <input
          type="text"
          {...register("description", { required: true })}
          id="category-description"
          className="input input-bordered"
          placeholder="Category description"
        />
      </div>
      <div className="form-control mt-6">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!isValid || createCategoryMutation.isPending}
        >
          {createCategoryMutation.isPending ? (
            <LazySpinner show={true} />
          ) : (
            "Create category"
          )}
        </button>
      </div>
    </form>
  );
};

export default NewCategory;
