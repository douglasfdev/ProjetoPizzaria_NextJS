import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/casSSRAuth";
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api';
import { ICategoryProps } from "@/interfaces";
import { toast } from "react-toastify";

export default function Product({ categoryList }: ICategoryProps) {


  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  function handleFile(evt: ChangeEvent<HTMLInputElement>) {
    if (!evt.target.files) {
      return;
    }

    const image = evt.target.files[0];

    if (!image) {
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image)
      setAvatarUrl(URL.createObjectURL(image));
    }
  }

  // Quando selecionar uma nova categoria na lista
  function handleChangeCategory(evt: ChangeEvent<HTMLSelectElement>) {
    return setCategorySelected(Number(evt.target.value));
  }

  async function handleRegister(evt: FormEvent) {
    evt.preventDefault();
    try {
      const data = new FormData();
      const verifyInputs = name === '' || price === '' || description === '' || avatarUrl === null;

      if (verifyInputs) {
        toast.error('Preencha todos os campos', {
          position: toast.POSITION.TOP_CENTER,
          theme: 'dark',
        })
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category', categories[categorySelected].id);
      data.append('banner', imageAvatar);

      const apiCliente = setupAPIClient();
      await apiCliente.post('/products', data);

      toast.success('Produto Cadastrado com Sucesso', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
      });

    } catch (err) {
      const errorMessage = err.response.data;
      toast.error(
        `Ops, algo de errado não está certo... ${errorMessage.error}: ${errorMessage.message}`,
      {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
      });
    } finally {
      setName('');
      setPrice('');
      setDescription('');
      setDescription('');
      setImageAvatar(null);
      setAvatarUrl('');
    }
  }

  return (
    <>
      <Head>
        <title>Novo produto - Tech Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleRegister}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={30} />
              </span>

              <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select value={categorySelected} onChange={handleChangeCategory}>
              {categories.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />

            <input
              type="text"
              placeholder="Preço do produto"
              className={styles.input}
              value={price}
              onChange={(evt) => setPrice(evt.target.value)}
            />

            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
            />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const { data } = await apiClient.get('/category');

  return {
    props: {
      categoryList: data,
    }
  }
})
