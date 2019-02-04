import { postsService } from '../services';

const state = {
    all: {},
    status: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        postsService.getAll()
            .then(
                posts => commit('getAllSuccess', posts),
                error => commit('getAllFailure', error)
            );
    },

    delete({ dispatch, commit }, id) {
        commit('deleteRequest', id);

        postsService.delete(id)
            .then(
                post => {
                    commit('deleteSuccess', id)
                },
                error => commit('deleteSuccess', { id, error: error.toString() })
            );
    },

    create({ dispatch, commit }, post) {
        commit('createPostRequest', post);
    
        postsService.create(post)
            .then(
                data => {
                    if(data.error){
                        commit('createPostFailure', data.error);
                        dispatch('alert/error', data.error, { root: true });
                    }else{
                        commit('createPostSuccess', data);
                        setTimeout(() => {
                            dispatch('posts/getAll', data, { root: true });
                            dispatch('alert/success', 'Criado com sucesso', { root: true });
                        })
                    }
                },
                error => {
                    commit('createPostFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, posts) {
        state.all = { items: posts };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.posts.map(post =>
            post.id === id
                ? { ...post, deleting: true }
                : post
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        //state.all.items.posts = state.all.items.posts.filter(post => post.id !== id)
        state.status = { deleting: true };
        location.reload(true);
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items.posts = state.items.posts.map(post => {
            if (post.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...postCopy } = post;
                // return copy of user with 'deleteError:[error]' property
                return { ...postCopy, deleteError: error };
            }

            return user;
        })
    },
    createPostRequest(state, post) {
        state.status = { registering: true };
    },
    createPostSuccess(state, user) {
        state.status = {};
    },
    createPostFailure(state, error) {
        state.status = {};
    }
};

export const posts = {
    namespaced: true,
    state,
    actions,
    mutations
};