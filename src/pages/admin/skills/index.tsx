import { useEffect, useState } from 'react';
import LayoutAdmin from '../../../layouts/LayoutAdmin';
import BlockAdmin from '../../../components/BlockAdmin';
import Table from '../../../components/Table';
import { Align, Column } from '../../../types/index';
import '../../../assets/styles/pages/admin/skill/index.less';
import usePublicStore from "../../../store/index"
import { Link } from 'react-router-dom';
import BlockItem from '../../../components/BlockItem';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ApiClient from '../../../library/ApiClient';
import AddToast from '../../../library/Toast';

function SkillAdminPage() {

  const publicStore = usePublicStore();

  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    publicStore.fetchSkills();
  }, [])

  const columns = [
    {
      key: 'id',
      title: 'ID',
      align: Align.Left,
      scopedSlots: true,
    },
    {
      key: 'name',
      title: 'Name',
      align: Align.Left,
    },
    {
      key: 'score',
      title: 'Score',
      align: Align.Left,
    },
    {
      key: 'created_at',
      title: 'Created At',
      align: Align.Left,
      isTime: true,
    },
    {
      key: 'updated_at',
      title: 'Updated At',
      align: Align.Left,
      isTime: true,
    },
    {
      key: 'remove',
      title: 'Action',
      align: Align.Left,
      isTime: true,
    },
  ];

  const handleAdd = async () => {
    if (name === "") {
      AddToast("Error","Bạn phải nhập tên", "toast");
      return;
    }

    if (score === "") {
      AddToast("Error","Bạn phải nhập score", "toast");
      return;
    }

    if (Number(score) <= 0 || Number(score) > 100) {
      AddToast("Error","Score trong khoảng 1 - 100", "toast");
      return;
    }
    
    try {
      await new ApiClient().post('/skills', {
        name,
        score: Number(score),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      publicStore.fetchSkills();
      AddToast('Success', 'Add skill thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Add skill không thành công!', 'toast');
      return error;
    }
  };

  return (
    <div>
      <LayoutAdmin selected={3} pageName="Skills">
        <div className="main">
          <BlockAdmin className="skills" blockName="Add Skill">
            <div className="container row flex items-center">
              <div className="col-3">
                Name:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="col-3">
                Score:
                <Input className="border-color border-black w-full p-1 pl-2 focus:outline-none" value={score} onChange={(e) => setScore(e.target.value)} />
              </div>
              <div className="col-3 flex justify-end">
                <Button className="inline-block w-28 text-center text-white bg-sky-400 border-sky-400 hover:bg-sky-500 h-10 rounded text-lg" onClick={() => handleAdd()}>Add</Button>
              </div>
            </div>
          </BlockAdmin>
          <BlockAdmin className="skills" blockName="Table Skills">
            <Table data={publicStore.skills} columns={columns} urlRemove="/skills/" is_router_link router_builder='/admin/skill'/>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default SkillAdminPage
