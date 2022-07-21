import { useState } from "react";

const useMessage = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => {
        setShowModal(false)
    };
    const handleShowModal = () => {
        setShowModal(true)
    };

    return [showModal, handleModalClose, handleShowModal];
}

export default useMessage