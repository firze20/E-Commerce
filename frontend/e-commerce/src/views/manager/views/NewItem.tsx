import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateItemMutation } from "@/hooks/manager/useCreateItemMutation";
import { useQueryCategories } from "@/hooks/shop/useQueryCategories";
import { ItemCreationParams } from "@/api/manager/managerApi";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Select from "react-select";

const NewItem = () => {
  const {
    register,
    formState: { isValid },
    setValue,
    handleSubmit,
  } = useForm<ItemCreationParams>();

  const categoriesQuery = useQueryCategories();

  const createItemMutation = useCreateItemMutation();

  const onSubmit: SubmitHandler<ItemCreationParams> = (
    data: ItemCreationParams
  ) => {
    createItemMutation.mutate(data);
  };

  // Options for the react-select component
  const categoryOptions = categoriesQuery.data?.map((category) => ({
    value: category.name,
    label: category.name,
  }));

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
          <label htmlFor="categories">
          <span className="label-text">Categories:</span>
        </label>
        <Select
          isMulti
          name="categories"
          options={categoryOptions}
          className="basic-multi-select"
          classNamePrefix="Add categories to this item"
          onChange={(selectedOptions) => {
            // Update the value in react-hook-form
            const selectedCategories = selectedOptions.map(option => option.value);
            setValue("categories", selectedCategories);
          }}
        />
      </div>
      <div className="form-control mt-6">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!isValid || createItemMutation.isPending}
        >
          {createItemMutation.isPending ? <LazySpinner show={true} /> : "Create item"}
        </button>
      </div>
    </form>
  );
};

export default NewItem;
