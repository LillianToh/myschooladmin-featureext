<template>
    <div class="Teachers">
        <div>
            <ul class="list-group">
                <li class="list-group-item list-group-item-action" v-for="(teacher, id) in teachers" :key="id" @click="getSubjectsbyTeacher(teacher.id)">
                    <b-avatar size="5rem" variant="secondary"></b-avatar>
                    {{ teacher.given_name }} {{ teacher.last_name }}
                </li>
            </ul>
        </div><br/><br/>
        <div class="media-body container-fluid float-right">
            <b-table id="teacher-subjects" bordered small table-variant="info" :items="teacherSubjects"></b-table>
        </div>
        <!-- <v-container>
            <v-layout row wrap>
                <v-flex xs12 sm6 lg3 v-for="(teacher, id) in teachers" :key="id">
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
                            <div> {{ teacher.given_name }} </div>
                            <div> {{ teacher.last_name }} </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container> -->
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "Teachers",
    data() {
        return {
            teachers: [],
            teacherSubjects: [],
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
        this.getTeachers(),
        this.getSubjectsbyTeacher()
    },

    methods: {
        async getTeachers() {
            try {
                const response = await axios.get("http://localhost:5000/users/myschooladmin/teachers");
                this.teachers = response.data;
                // console.log(this.teachers);
            } catch(err) {
                console.log(err);
            }
        },
        async getSubjectsbyTeacher() {
            try {
                const response = await axios.get("http://localhost:5000/users/myschooladmin/teachers/subjects");
                this.teacherSubjects = response.data;
                console.log(this.teacherSubjects);
            } catch(err) {
                console.log(err);
            }
        }
    }
};
</script>
<style>
</style>
