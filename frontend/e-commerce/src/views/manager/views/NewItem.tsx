import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateItemMutation } from "@/hooks/manager/useCreateItemMutation";
import { useQueryCategories } from "@/hooks/shop/useQueryCategories";
import { ItemCreationParams } from "@/api/manager/managerApi";

const NewItem = () => {
  const {
    register,
    watch,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ItemCreationParams>();

  const categoriesQuery = useQueryCategories();

  const createItemMutation = useCreateItemMutation();

  const onSubmit: SubmitHandler<ItemCreationParams> = (
    data: ItemCreationParams
  ) => {
    createItemMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="item-name">
          <span className="label-text">Item name:</span>
        </label>
        <input
          {...register("name", { required: true })}
          type="text"
          id="item-name"
          className="input input-bordered"
          placeholder="Item name"
        />
        <label htmlFor="item-description">
          <span className="label-text">Item description:</span>
        </label>
        <textarea
          {...register("description", { required: true })}
          id="item-description"
          className="input input-bordered"
          placeholder="Item description"
        />
        <label htmlFor="price">
          <span className="price">Item price:</span>
        </label>
        <input
          type="number"
          step={0.01}
          {...register("price", { required: true })}
          id="price"
          className="input input-bordered"
          placeholder="Item price"
        />
        <label htmlFor="image-src">
          <span className="label-text">Image URL:</span>
        </label>
        <input
          type="url"
          {...register("image", { required: true })}
          id="image-src"
          className="input input-bordered"
          placeholder="Image URL"
        />
      </div>
      <div className="form-control mt-6">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!isValid || createItemMutation.isPending}
        >
          Create Item
        </button>
      </div>
    </form>
  );
};

export default NewItem;
