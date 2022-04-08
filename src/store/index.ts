import create from 'zustand';
import ApiClient from '../library/ApiClient';
import { User, Project, Skill, School, Certificate } from '../types';

type PublicStore = {
  user?: User
  projects?: Project[]
  skills?: Skill[]
  schools?: School[]
  certificates?: Certificate[]

  fetchUser: () => Promise<unknown>
  fetchSkills: () => Promise<unknown>
  fetchProjects: () => Promise<unknown>
  fetchSchools: () => Promise<unknown>
  fetchCertificates: () => Promise<unknown>
}

const usePublicStore = create<PublicStore>((set, get) => ({
  fetchUser: async () => {
    try {
      const { data: user } = await new ApiClient().get('/users/1');

      set({
        ...get(),
        user,
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
}))

export default usePublicStore;
