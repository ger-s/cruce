import Swal from "sweetalert2";

class Notification {
    static successMessage (msg) {
        Swal.fire({
            icon: "success",
            title: msg,
            showConfirmButton: false,
            timer: 1500,
        });
    }
    static errorMessage (msg) {
        Swal.fire({
            icon: "error",
            title: msg,
            showConfirmButton: false,
            timer: 1500,
        });
    }
}

export default Notification