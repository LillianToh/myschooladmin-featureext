<template>
    <div class="Teachers">   
        <div>
            <div>
                <ul class="list-group">
                    <li v-b-toggle.collapse-1 variant="primary" class="list-group-item list-group-item-action" v-for="(teacher) in teachers" :key="teacher.id" @click="getSubjectsbyTeacherId(teacher.id); getStudentsbyTeacherId(teacher.id)">
                        <b-avatar size="5rem" variant="secondary" :text="teacher.given_name.charAt(0)+teacher.last_name.charAt(0)"></b-avatar>
                        {{ teacher.given_name }} {{ teacher.last_name }}
                    </li>
                 </ul>
                    <b-collapse id="collapse-1" class="mt-2">
                        <b-card>
                            <p class="card-text">{{ subjectsbyTeacherId }} </p>
                            <b-button v-b-toggle.collapse-1-inner size="sm">Show Students</b-button>
                            <b-collapse id="collapse-1-inner" class="mt-2">
                                <b-card>{{ studentsbyTeacherId }}</b-card>
                            </b-collapse>
                        </b-card>
                    </b-collapse>
            </div><br/><br/>
            <div class="media-body container-fluid float-right">
                <b-table id="teacher-subjects" bordered small table-variant="info" :items="subjectsbyTeacherId"></b-table>
                <b-table id="teacher-students" bordered small table-variant="info" :items="studentsbyTeacherId"></b-table>
            </div>
            <!-- <div>
                <b-table id="teacher-students" bordered small table-variant="info" :items="studentsbyTeacherId"></b-table>
                 <div class="jumbotron" style="border-radius:0px;">
                        <slot> HOW </slot>    
                </div>
                <h1>{{ getTeachers }}</h1>
            </div> -->
        </div><br/><br/>
        
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
            subjectsbyTeacherId: [],
            studentsbyTeacherId: [],
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
        this.getSubjectsbyTeacherId(),
        this.getStudentsbyTeacherId()
    },

    // render() {
    // },

    methods: {
        async getTeachers() {
            try {
                const response = await axios.get("http://localhost:5000/users/myschooladmin/teachers");
                this.teachers = response.data;
                // console.log("teachers", this.teachers);
            } catch(err) {
                console.log(err);
            }
        },
        async getSubjectsbyTeacherId(teacher_id) {
            // console.log("Teacher id on click", teacher_id);
            try {
                const response = await axios.get(`http://localhost:5000/users/myschooladmin/subjects/` + teacher_id);
                this.subjectsbyTeacherId = response.data;
                // console.log("list of subjects", this.subjectsbyTeacherId);
            } catch(err) {
                console.log(err);
            }
        },
        async getStudentsbyTeacherId(teacher_id) {
            // console.log("Teacher id on click", teacher_id);
            try {
                const response = await axios.get(`http://localhost:5000/users/myschooladmin/students-teachers/` + teacher_id);
                this.studentsbyTeacherId = response.data;
            } catch(err) {
                console.log(err);
            }
        }
    }
};
</script>
<style>
</style>
