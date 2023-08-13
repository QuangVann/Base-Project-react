import React from 'react';
import { Button, Form, Input } from 'antd';
import { useAddProductMutation } from '@/api/product';
import { useNavigate } from 'react-router-dom';
import IProduct from '@/interfaces/product';


type FieldType = {
  name: string,
  price: number,
  image: string
};

const AdminProductAdd = () => {
const [addProduct] = useAddProductMutation();
const navigate = useNavigate() ;
const onFinish = (values: IProduct)=>{
    addProduct(values)
    .unwrap()
    .then(()=>navigate("/admin/product"))

}

    return (
        <div>
              <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="ten san pham"
      name="name"
      rules={[{ required: true, message: 'không được nhập ít hơn 3 kí tự' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="gia san pham"
      name="price"
      rules={[{ required: true, message: 'giá lớn hơn 0' }]}
    >
      <Input/>

    </Form.Item>
    <Form.Item<FieldType>
      label="anh san pham"
      name="image"
      rules={[{ required: true, message: 'tải ảnh hoặc đường dẫn' }]}
    >
      <Input />
    </Form.Item>

    

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
       Add
      </Button>
    </Form.Item>
  </Form>
        </div>
    )
}

export default AdminProductAdd;

