<template>
    <div class="Teachers">
        <v-container>
            <v-layout row wrap>
                <v-flex xs12 sm6 lg3 v-for="person in team" :key="person.name">
                    <v-card flat class="text-xs-center ma-3">
                        <v-card-action>
                            <v-btn @click="openAvatarPicker" class="btn btn-danger">Change Avatar</v-btn>
                        </v-card-action>       
                        <v-responsive class="pt-4">
                            <v-avatar>
                                <img :src="person.avatar">                       
                            </v-avatar>
                        </v-responsive>
                        <v-card-text>
                            <div> {{ person.name }} </div>
                            <div> {{ person.expertise }} </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "Teachers",
    data() {
        return {
            teachers: [],
            team: [
                { name: 'Maria', expertise: 'Vue', avatar: '/avatar-1.png'},
                { name: 'Eduardo', expertise: 'Technology', avatar: '/avatar-2.png'},
                { name: 'Melissa', expertise: 'Loop', avatar: '/avatar-3.png'},
                { name: 'Anne', expertise: 'API', avatar: '/avatar-4.png'},
                { name: 'Mike', expertise: 'Bootstrap', avatar: '/avatar-5.png'},
                { name: 'Adam', expertise: 'React', avatar: '/avatar-6.png'}
            ]
        }
    },

    created() {
        this.getTeachers()
    },

    methods: {
        async getTeachers() {
            try {
                const response = await axios.get("http://localhost:5000/users/myschooladmin/teachers");
                this.teachers = response.data;
                console.log(this.teachers);
            } catch(err) {
                console.log(err);
            }
        }
    }
};
</script>
<style>
</style>
