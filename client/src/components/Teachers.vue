<template>
    <div class="Teachers">   
        <div>
            <div>
                <ul class="list-group">
                    <li v-b-toggle.collapse-1 variant="primary" class="list-group-item list-group-item-action" v-for="teacher in teachers" :key="teacher.id" @click="getSubjectsbyTeacherId(teacher.id); getStudentsbyTeacherId(teacher.id)">
                        <b-avatar size="6rem" variant="secondary" :text="teacher.given_name.charAt(0)+teacher.last_name.charAt(0)"></b-avatar>
                        {{ teacher.given_name }} {{ teacher.last_name }}
                    </li>
                 </ul>
                    <b-collapse id="collapse-1" class="mt-2">
                        <b-card>
                            <p class="card-text" v-for="(subject, index) in subjectsbyTeacherId" :key="index"> {{ subject.subject }} </p>
                            <b-button variant="outline-info" v-b-toggle.collapse-1-inner size="sm">Show Students</b-button>
                            <div class="float-right"> 
                                {{ studentsbyTeacherId.length }} students enrolled 
                            </div>
                            <b-collapse v-for="(student, index) in studentsbyTeacherId" :key="index" id="collapse-1-inner" class="mt-2">
                                <b-card>
                                    {{ student.student_given_name }} {{ student.student_last_name }}
                                </b-card>
                            </b-collapse>
                        </b-card>
                    </b-collapse>
            </div><br/><br/>
            <!-- <div class="media-body container-fluid float-right">
                <b-table id="teacher-subjects" bordered small table-variant="info" :items="subjectsbyTeacherId"></b-table>
                <b-table id="teacher-students" bordered small table-variant="info" :items="studentsbyTeacherId"></b-table>
            </div> -->
        </div>
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
            studentsbyTeacherId: []
            // PASS PROPS grades: [] from Grades.Vue - render subject
        }
    },

    created() {
        this.getTeachers(),
        this.getSubjectsbyTeacherId(),
        this.getStudentsbyTeacherId()
    },

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
