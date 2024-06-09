import Swal from "sweetalert2";

const feedbackModel = (data: any) => {
    const {status, title, message} = data;

    return Swal.fire({
        title: title,
        text: message,
        icon: status,
        showConfirmButton: status !== 'success',
        confirmButtonText: 'Ok',
        timer: status === 'success' ? 1500 : undefined
    });
};

export default feedbackModel;