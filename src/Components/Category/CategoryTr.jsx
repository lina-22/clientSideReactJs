import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { DELETE_CATEGORIES, SELECT_CATEGORIES } from "../../actionTypes";
import { CategoryContext } from "../../contexts";
import { BACKEND_URL, IMAGE_URL } from "../../utils";

function CategoryTr({ category, handleShowModal }) {
  const {categoryDispatch} = useContext(CategoryContext);

  const deleteCategory = (id) => {
    if(window.confirm('Are You Sure?')){


      axios.delete(`${BACKEND_URL}/categories/${id}`).then(res => {
        const {status, message} = res.data;

        if(status){

          categoryDispatch({
            type: DELETE_CATEGORIES,
            payload: id
          })
          
          toast.success(message);
        }else{
          toast.error(message);
        }

      }).catch(err => {
        console.log(err);
        toast.error('Server Error!!')
      })

    }

  }

  const editHandler = cat => {
    categoryDispatch({
      type: SELECT_CATEGORIES,
      payload: cat
    })
    handleShowModal();
  }

  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      {/* this line should delete as i cut cat images  */}
      <td>{category.is_featured}</td> 
      <td>
        {category.image && (
          <img width={100} src={`${IMAGE_URL}/${category.image}`} />
        )}
      </td>
      {/* until this line should delete as i cut cat images  */}
      <td>
        <Button variant="warning" size="sm" className="mx-1" onClick={() => editHandler(category)}>Edit</Button>
        <Button variant="danger" size="sm" className="mx-1" onClick={() => deleteCategory(category.id)}>Delete</Button>
      </td>
    </tr>
  );
}

export default CategoryTr;
