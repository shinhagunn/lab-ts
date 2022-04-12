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

function CertificateDetailAdminPage() {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const { id } = useParams();

  const publicStore = usePublicStore()

  const handleUpdate = async () => {
    if (name === "") {
      AddToast("Error","Bạn phải nhập tên", "toast");
      return;
    }

    if (year === "") {
      AddToast("Error","Bạn phải nhập năm", "toast");
      return;
    }

    try {
      await new ApiClient().patch(`/certificates/${id}`, {
        name,
        year, 
        updated_at: new Date().toLocaleDateString(),
      });
      AddToast('Success', 'Update certificate thành công!', 'toast');
    } catch (error) {
      AddToast('Error', 'Update certificate không thành công!', 'toast');
      return error;
    }
  };

  useEffect(() => {
    if (id) {
      publicStore.fetchCertificate(id).then((result) => {
        if (result) {
          setName(result.name);
          setYear(result.year);
        }
      });
    }
  }, []);

  return (
    <div>
      <LayoutAdmin selected={6} pageName="Certificates">
        <div className="main">
          <BlockAdmin className="certificates" blockName="Certificate Detail">
            <div>
              <div className="flex justify-between items-center">
                <div className="text-2xl">
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} title="Click here to change" />
                </div>
                <div>
                  Year:
                  <Input type="text" value={year} onChange={(e) => setYear(e.target.value)} title="Click here to change" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="text">
                  <span>{`Created at: ${publicStore.certificate? changeISOTimeToMyFormTime(publicStore.certificate.created_at): ''}`}</span>
                </div>
                <div>
                  <span>{`Last updated: ${publicStore.certificate? changeISOTimeToMyFormTime(publicStore.certificate.updated_at): ''}`}</span>
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

export default CertificateDetailAdminPage;
