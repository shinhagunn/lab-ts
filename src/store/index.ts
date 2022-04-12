import create from 'zustand';
import ApiClient from '../library/ApiClient';
import { User, Project, Skill, School, Certificate } from '../types';

type PublicStore = {
  users?: User[]
  projects?: Project[]
  skills?: Skill[]
  schools?: School[]
  certificates?: Certificate[]

  user?: User
  project?: Project
  skill?: Skill
  school?: School
  certificate?: Certificate

  fetchUsers: () => Promise<unknown>
  fetchSkills: () => Promise<unknown>
  fetchProjects: () => Promise<unknown>
  fetchSchools: () => Promise<unknown>
  fetchCertificates: () => Promise<unknown>

  fetchUser: () => Promise<User>
  fetchProject: (id: string) => Promise<Project>
  fetchSkill: (id: string) => Promise<Skill>
  fetchSchool: (id: string) => Promise<School>
  fetchCertificate: (id: string) => Promise<Certificate>
}

const usePublicStore = create<PublicStore>((set, get) => ({
  fetchUsers: async () => {
    try {
      const { data: users } = await new ApiClient().get('/users');

      set({
        ...get(),
        users,
      });
    } catch (error) {
      return error;
    }
  },

  fetchSkills: async () => {
    try {
      const { data: skills } = await new ApiClient().get('/skills');

      set({
        ...get(),
        skills,
      });
    } catch (error) {
      return error;
    }
  },

  fetchProjects: async () => {
    try {
      const { data: projects } = await new ApiClient().get('/projects');

      set({
        ...get(),
        projects,
      });
    } catch (error) {
      return error;
    }
  },

  fetchSchools: async () => {
    try {
      const { data: schools } = await new ApiClient().get('/schools');

      set({
        ...get(),
        schools,
      });
    } catch (error) {
      return error;
    }
  },

  fetchCertificates: async () => {
    try {
      const { data: certificates } = await new ApiClient().get('/certificates');

      set({
        ...get(),
        certificates,
      });
    } catch (error) {
      return error;
    }
  },

  fetchUser: async () => {
    try {
      const { data: user } = await new ApiClient().get('/users/1');

      set({
        ...get(),
        user,
      });

      return user;
    } catch (error) {
      return error;
    }
  },

  fetchProject: async (id: string) => {
    try {
      const { data: project } = await new ApiClient().get(`/projects/${id}`);

      set({
        ...get(),
        project,
      });

      return project;
    } catch (error) {
      return error;
    }
  },

  fetchSkill: async (id: string) => {
    try {
      const { data: skill } = await new ApiClient().get(`/skills/${id}`);

      set({
        ...get(),
        skill,
      });
      return skill;
    } catch (error) {
      return error;
    }
  },

  fetchSchool: async (id: string) => {
    try {
      const { data: school } = await new ApiClient().get(`/schools/${id}`);

      set({
        ...get(),
        school,
      });
      console.log(school);
      return school;
    } catch (error) {
      return error;
    }
  },

  fetchCertificate: async (id: string) => {
    try {
      const { data: certificate } = await new ApiClient().get(`/certificates/${id}`);

      set({
        ...get(),
        certificate,
      });
      return certificate;
    } catch (error) {
      return error;
    }
  },
}))

export default usePublicStore;
