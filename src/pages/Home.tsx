import Header from "../layouts/Header"
import "../assets/styles/pages/home.less"
import usePublicStore from "../store"
import { useEffect } from "react"
import Progress from "../components/Progress"
import BlockItem from "../components/BlockItem"

function Home() {
  const publicStore = usePublicStore()

  useEffect(() => {
    publicStore.fetchUser()
    publicStore.fetchSkills()
    publicStore.fetchProjects()
    publicStore.fetchSchools()
    publicStore.fetchCertificates()
  }, [])

  return (
    <div className="container wide flex">
      <Header name={publicStore.user?.name ? publicStore.user?.name : ''} job={publicStore.user?.job ? publicStore.user?.job : ''} avatar={publicStore.user?.avatar ? publicStore.user?.avatar : ''}/>
      <div className="nav col-3 pt-64 px-6 pb-12">
        <div className="info border-b-2 pb-4">
          <div className="flex items-center pb-4">
            <i className="fa-solid fa-user"></i>
            <span className="pl-4 text-base">{publicStore.user?.gender ? publicStore.user?.gender : ''}</span>
          </div>
          <div className="flex items-center pb-4">
            <i className="fa-solid fa-calendar"></i>
            <span className="pl-4 text-base">{publicStore.user?.birthday ? publicStore.user?.birthday : ''}</span>
          </div>
          <div className="flex items-center pb-4">
            <i className="fa-solid fa-phone"></i>
            <span className="pl-4 text-base">{publicStore.user?.phone ? publicStore.user?.phone : ''}</span>
          </div>
          <div className="flex items-center pb-4">
            <i className="fa-solid fa-envelope"></i>
            <span className="pl-4 text-base">{publicStore.user?.email ? publicStore.user?.email : ''}</span>
          </div>
          <div className="flex items-center pb-4">
            <i className="fa-brands fa-internet-explorer"></i>
            <a href={publicStore.user?.facebook ? publicStore.user?.facebook : ''} className="pl-4 text-base">{publicStore.user?.facebook ? publicStore.user?.facebook : ''}</a>
          </div>
          <div className="flex items-center pb-4">
            <i className="fa-solid fa-location-dot"></i>
            <span className="pl-4 text-base">{publicStore.user?.address ? publicStore.user?.address : ''}</span>
          </div>
        </div>

        <div className="skills border-b-2 py-4">
          <h4 className="font-bold uppercase text-lg pb-4">CÁC KỸ NĂNG</h4>

          {publicStore.skills?.map((skill) => (
              <Progress title={skill.name} score={skill.score} className="py-2"/>
            ))}
        </div>

        <div className="favorites border-b-2 py-4">
          <h4 className="font-bold uppercase text-lg pb-4">Chứng chỉ</h4>
          
          {publicStore.certificates?.map((certificate) => (
            <div className="py-1">
              <p className="font-bold">{certificate.year}:</p>
              <p>{certificate.name}</p>
            </div>
          ))}
        </div>

        <div className="favorites py-4">
          <h4 className="font-bold uppercase text-lg pb-4">SỞ THÍCH</h4>
          
          <ul className="list-disc pl-4">
            {publicStore.user?.favorites.map((favorite) => (
              <li className="py-1">{favorite.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="content col-0 py-72 px-6">
        <div className="">
          <h3 className="font-bold uppercase text-xl border-b-2 inline-block border-black pb-1 mb-4">HỌC VẤN</h3>

          <ul className="list-disc pl-4">
            {publicStore.schools?.map((school) => (
              <li className="py-2">
                <BlockItem title={school.name} start_date={school.start_time} end_date={school.end_time} >
                  {school.achievements.map ((achievement) => (
                    <p className="pt-1">- {achievement.name}</p>
                  ))}
                </BlockItem>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="py-8">
          <h3 className="font-bold uppercase text-xl border-b-2 inline-block border-black pb-1 mb-4">DỰ ÁN</h3>

          <ul className="list-disc pl-4">
            {publicStore.projects?.map((project) => (
              <li className="py-2">
                <BlockItem title={project.name} start_date={project.start_time} end_date={project.end_time} >
                  {project.descriptions.map((description) => (
                    <p className="pt-1">- {description.name}</p>
                  ))}
                </BlockItem>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home