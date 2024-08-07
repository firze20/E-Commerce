import { useParams } from "react-router-dom";
import { useQueryCategory } from "@/hooks/shop/useQueryCategory";
import { useUpdateCategoryMutation } from "@/hooks/manager/useUpdateCategoryMutation";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateCategoryParams } from "@/api/manager/managerApi";
import LazySpinner from "@/components/common/loading/LazySpinner";
import Error from "@/components/common/error/Error";
import { useEffect } from "react";

const EditCategory = () => {
    const { id } = useParams();

    const {data, isLoading, isError, error} = useQueryCategory(Number(id));

    const updateCategoryMutation = useUpdateCategoryMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
        reset,
    } = useForm<UpdateCategoryParams["body"]>({
        defaultValues: {
            name: "",
            description: "",
        },
    });

    useEffect(() => {
        if (data) {
            setValue("name", data.name);
            setValue("description", data.description);
        }
    }, [data, reset]);

    const onSubmit: SubmitHandler<UpdateCategoryParams["body"]> = (data) => {
        const updateCategory: UpdateCategoryParams = {
            id: Number(id),
            body: data,
        };
        updateCategoryMutation.mutate(updateCategory);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isLoading ? <LazySpinner show={isLoading} /> : null}
            {isError && error ? <Error error={error} /> : null}
            <div className="form-control">
            { data ? (
                <>
                    <label htmlFor="name">
                        <span className="label-text">Category name:</span>
                    </label>
                    <input 
                        {...register("name", { required: true })}
                        type="text" 
                        id="name"
                        className="input input-primary"
                        placeholder="Category name"
                    />
                    {errors.name && (
                        <span className="error">Category name is required</span>
                    )}
                    <label htmlFor="description">
                        <span className="label-text">Description:</span>
                    </label>
                    <textarea 
                        {...register("description", { required: true })}
                        id="description"
                        className="input input-primary"
                        placeholder="Description"
                    />
                    {errors.description && (
                        <span className="error">Description is required</span>
                    )}
                </>
            ) : null }
            </div>
            <div className="form-control mt-6">
                <button 
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid}
                >
                    {updateCategoryMutation.isPending ? (
                        <span className="loading loading-spinner bg-primary"></span>
                    ) : (
                        "Update category"
                    )}
                </button>
            </div>
        </form>
    )


};

export default EditCategory;