/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Block from '../../../components/Block';
import BlockAdmin from '../../..//components/BlockAdmin';
import BlockItem from '../../..//components/BlockItem';
import Button from '../../../components/Button';
import LayoutAdmin from '../../../layouts/LayoutAdmin';
// import { changeISOTimeToMyFormTime } from '~/mixins/helper';
import ApiClient from '../../../library/ApiClient';
import AddToast from '../../../library/Toast';
import Input from '../../../components/Input';
import usePublicStore from '../../../store';
// import '~/assets/styles/pages/admin/product/detail.less';
import { changeISOTimeToMyFormTime } from '../../../mixins/helper';

function SkillDetailAdminPage() {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const { id } = useParams();

  const publicStore = usePublicStore()

  const navigation = useNavigate();

  const handleUpdate = async () => {
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
      await new ApiClient().patch(`/skills/${id}`, {
        name,
        score: Number(score), 
        updated_at: new Date().toLocaleDateString(),
      });
      AddToast('Success', 'Update skill thành công!', 'toast');
      navigation("/admin/skills")
    } catch (error) {
      AddToast('Error', 'Update skill không thành công!', 'toast');
      return error;
    }
  };

  useEffect(() => {
    if (id) {
      publicStore.fetchSkill(id).then((result) => {
        if (result) {
          setName(result.name);
          setScore(String(result.score));
        }
      });
    }
  }, []);

  return (
    <div>
      <LayoutAdmin selected={3} pageName="Skills">
        <div className="main">
          <BlockAdmin className="skills" blockName="Skill Detail">
            <div>
              <div className="flex justify-between items-center">
                <div className="text-2xl">
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} title="Click here to change" />
                </div>
                <div>
                  Score:
                  <Input type="text" value={score} onChange={(e) => setScore(e.target.value)} title="Click here to change" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="text">
                  <span>{`Created at: ${publicStore.skill? changeISOTimeToMyFormTime(publicStore.skill.created_at): ''}`}</span>
                </div>
                <div>
                  <span>{`Last updated: ${publicStore.skill? changeISOTimeToMyFormTime(publicStore.skill.updated_at): ''}`}</span>
                </div>
              </div>
            </div>
            <Block className="justify-end">
              <Button className="btn bg-indigo-400 hover:bg-indigo-500 btn-icon p-2 text-white rounded w-28 mt-12 text-lg " onClick={() => handleUpdate()}>Update</Button>
            </Block>
          </BlockAdmin>
        </div>
      </LayoutAdmin>
    </div>
  );
}

export default SkillDetailAdminPage;
