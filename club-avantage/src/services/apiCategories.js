import api from './api';

export default {
    getCategories() {
        return api.get('/categories');
    },

    setCategory(category) {
        return api.post('/categories', category);
    },

    updateCategory(category) {
        return api.put(`/categories/${category.id}`, category); 
    },

    deleteCategory(categoryId) {
        return api.delete(`/categories/${categoryId}`);
    },
}