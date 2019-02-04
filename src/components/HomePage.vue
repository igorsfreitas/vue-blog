<template>
    <v-app id="inspire">
        <v-layout row>
            <v-flex xs12 >
                <v-card>
                    <v-card-title class="blue white--text">
                        <span class="headline">Posts Page</span>
                        <v-spacer></v-spacer>
                        <v-menu bottom left>
                            <v-btn
                            slot="activator"
                            dark
                            icon
                            >
                            <router-link to="/login" class="btn btn-link"><v-icon>exit_to_app</v-icon></router-link>
                            </v-btn>
                        </v-menu>
                    </v-card-title>
                </v-card>
                </v-flex>
        </v-layout>
        <v-content>
            <div v-if="posts.items">
                <v-container fluid v-for="post in posts.items.posts" :key="post.id">
                    <v-layout align-center justify-center>
                        <v-flex xs12 sm8 md6>
                            <v-card class="elevation-12">
                                <v-toolbar dark color="primary">
                                    <v-toolbar-title>{{post.title}}</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <span v-if="post.deleting"><em> - Deleting...</em></span>
                                    <span v-else-if="post.deleteError" class="text-danger"> - ERROR: {{post.deleteError}}</span>
                                    <span v-else><a @click="deletePost(post.id)" class="text-danger"><v-icon>delete</v-icon></a></span>
                                </v-toolbar>
                                <v-card-text>
                                    {{post.body}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </div>
            <v-container fluid >
                <v-layout align-center justify-center>
                    <v-flex xs12 sm8 md6>
                        
                    </v-flex>
                </v-layout>
                <div class="text-xs-center">
                    <v-dialog
                    v-model="dialog"
                    width="500"
                    >
                        <v-btn
                            slot="activator"
                            color="pink"
                            dark
                            medium
                            fixed
                            bottom
                            right
                            fab
                        >
                            <v-icon>add</v-icon>
                        </v-btn>

                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Create post</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-form>
                                    <v-text-field label="Title" type="text" v-model="post.title" v-validate="'required'" name="title" :class="{ 'is-invalid': submitted && errors.has('title') }"></v-text-field>
                                    <v-textarea
                                    name="input-7-1"
                                    label="Body"
                                    v-model="post.body"
                                    maxlength="300"
                                    ></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="handleSubmit">Create</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>

            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            post: {
                title: '',
                body: ''
            },
            submitted: false,
            dialog: false
        }
    },
    computed: {
        ...mapState({
            posts: state => state.posts.all
        })
    },
    created () {
        this.getAllPosts();
    },
    methods: {
        ...mapActions('posts', {
            getAllPosts: 'getAll',
            deletePost: 'delete',
            createPost: 'create'
        }),
        handleSubmit(e) {
            this.submitted = true;
            this.dialog = false
            this.$validator.validate().then(valid => {
                if (valid) {
                    
                    this.createPost(this.post)
                    setTimeout(() => {
                        this.post = {
                            title: '',
                            body: ''
                        }
                    })
                }
            });
        }
    }
};
</script>

<style>
.btn-link{
        color: #fff;
}
</style>