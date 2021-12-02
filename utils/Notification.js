import Swal from "sweetalert2";

class Notification {
    static successMessage (msg) {
        Swal.fire({
            icon: "success",
            title: msg,
            showConfirmButton: false,
            timer: 2000,
        });
    }
    static errorMessage (msg) {
        Swal.fire({
            icon: "error",
            title: msg,
            showConfirmButton: false,
            timer: 2000,
        });
    }
}

export default Notification