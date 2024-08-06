import { useParams } from "react-router-dom";
import { useQueryItem } from "@/hooks/shop/useQueryItem";
import { useQueryCategories } from "@/hooks/shop/useQueryCategories";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateItemMutation } from "@/hooks/manager/useUpdateItemMutation";
import { useDeleteItemMutation } from "@/hooks/manager/useDeleteItemMutation";
import { UpdateItemParams } from "@/api/manager/managerApi";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Error from "@/components/common/error/Error";
import { ApiError } from "@/api/api.types";
import { useEffect } from "react";
import Select from "react-select";

const EditItem = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQueryItem(Number(id));
  const { data: categoriesData } = useQueryCategories();

  const updateItemMutation = useUpdateItemMutation();

  const deleteItemMutation = useDeleteItemMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateItemParams["body"]>({
    defaultValues: {
      name: "",
      description: "",
      image: "",
      price: "0",
      stock: 0,
      categories: [],
    },
  });

  const initialCategories =
    data?.item.categories.map((category) => ({
      value: category,
      label: category,
    })) || [];

  useEffect(() => {
    if (data) {
      setValue("name", data.item.name);
      setValue("description", data.item.description);
      setValue("image", data.item.image);
      setValue("price", data.item.price);
      setValue("categories", data.item.categories);
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<UpdateItemParams["body"]> = (data) => {
    const updateItem: UpdateItemParams = {
      id: Number(id),
      body: data,
    };
    updateItemMutation.mutate(updateItem);
  };

  const onDeleteHandler = () => {
    deleteItemMutation.mutate(Number(id));
  };

  // Options for the react-select component
  const categoryOptions =
    categoriesData?.map((category) => ({
      value: category.name,
      label: category.name,
    })) || [];



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? <LazySpinner show={isLoading} /> : null}
      {isError ? <Error error={error as ApiError} /> : null}
      <div className="form-control">
        <button
          type="button"
          className="btn btn-error"
          onClick={onDeleteHandler}
        >
          {deleteItemMutation.isPending ? (
            <span className="loading loading-spinner bg-error"></span>
          ) : (
            "Delete item"
          )}
        </button>
        {data ? (
          <>
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
            {errors.name && <p className="text-red-600">Name is required</p>}
            <label htmlFor="item-description">
              <span className="label-text">Item description:</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              id="item-description"
              className="input input-bordered"
              placeholder="Item description"
            />
            {errors.description && (
              <p className="text-red-600">Description is required</p>
            )}
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
            {errors.price && <p className="text-red-600">Price is required</p>}
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
            {errors.image && (
              <p className="text-red-600">Image URL is required</p>
            )}
            <label htmlFor="categories">
              <span className="label-text">Categories:</span>
            </label>
            <Select
              isMulti
              name="categories"
              defaultValue={initialCategories}
              options={categoryOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) => {
                setValue(
                  "categories",
                  selectedOptions.map((option) => option.value)
                );
              }}
            />
          </>
        ) : null}
      </div>
      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            !isValid ||
            isLoading ||
            updateItemMutation.isPending ||
            deleteItemMutation.isPending
          }
        >
          {updateItemMutation.isPending ? (
            <span className="loading loading-spinner bg-success"></span>
          ) : (
            "Update item"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditItem;
