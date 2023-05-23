import { ChangeEvent, useState } from "react";
import Head from "next/head";
import styles from './styles.module.scss';
import { Header } from "@/components/Header";
import { canSSRAuth } from "@/utils/casSSRAuth";
import { FiUpload } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api';
import { ICategoryProps } from "@/interfaces";

export default function Product({ categoryList }: ICategoryProps) {


  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState(null);
  const [categories, setCategories] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);

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
  function handleChangeCategory(evt) {
    setCategorySelected(evt.target.value);
    
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

          <form className={styles.form}>
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
              {categories.map( (item, index) => {
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
            />

            <input type="text" placeholder="Preço do produto" className={styles.input} />

            <textarea placeholder="Descreva seu produto..." className={styles.input} />

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
