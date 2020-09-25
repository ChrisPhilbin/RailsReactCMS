export const getToken = () => {
    document.querySelector('meta[name="csrf-token"]').content
}