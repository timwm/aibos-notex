"use client"
import React from 'react';
import Sidebar from '../components/sidebar';
// import './index.css'; // Assuming Tailwind imports here

const ContentContainer = ({ title, children }) => (
  <div className="border border-line rounded-xl mb-5 p-12 max-md:border-none max-md:p-0">
    <h2 className="text-2xl font-semibold mt-4 mb-2">{title}</h2>
    <p className="text-secondary-text mt-1.5 mb-4 max-md:text-base">{children}</p>
  </div>
);

const App = () => {
  return (
    // Replicates the original body CSS: display: grid; grid-template-columns: auto 1fr;
    <div className="min-h-screen bg-base text-text grid md:grid-cols-[auto_1fr] grid-cols-1 font-sans">
      
      <Sidebar />
      
      <main className="p-8 max-md:pt-8 max-md:px-4 max-md:pb-[60px]">
        <ContentContainer title="Hello World">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis porro iure quaerat aliquam! Optio dolorum in eum provident, facilis error repellendus excepturi enim dolor deleniti adipisci consectetur doloremque, unde maiores odit sapiente. Atque ab necessitatibus laboriosam consequatur eius similique, ex dolorum eum eaque sequi id veritatis voluptates perspiciatis, cupiditate pariatur.
        </ContentContainer>
        <ContentContainer title="Example Heading">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic aliquid corrupti, tenetur fuga magnam necessitatibus blanditiis quod sint excepturi laborum esse alias labore molestias adipisci, nostrum corporis ex maiores quis dolore quidem asperiores odio ad fugit eos! Delectus modi quas ipsa deleniti consequuntur nihil, hic in ipsum exercitationem blanditiis natus, ex, expedita eos. Excepturi quidem harum hic nam magnam deserunt illum quis dolorum eos ipsum ut natus sapiente sit, officia obcaecati assumenda tempore molestias? In fugiat iure laboriosam quasi, eum suscipit, harum autem saepe ut, soluta aspernatur ducimus eos magnam quidem officiis. Laboriosam nemo explicabo delectus, et quos vero cum?
        </ContentContainer>
        <ContentContainer title="Lorem Ipsum">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore repudiandae labore veniam reprehenderit voluptatum, laboriosam perferendis fuga, dolore quam quas nostrum totam sunt esse expedita. Vero distinctio omnis accusantium. Quisquam ullam saepe cupiditate magni numquam totam perspiciatis error velit, debitis veniam labore possimus aut sunt, reiciendis natus. Impedit provident voluptatum nulla fuga error a magnam, corporis natus aperiam fugit quod perferendis quos quaerat, numquam sequi doloribus tenetur dolorem voluptate deleniti, odio minus. Deserunt eius quasi odit voluptas unde voluptatum dicta cumque exercitationem soluta beatae porro distinctio, delectus officiis, nobis officia ullam necessitatibus, rem natus corrupti nam! Est, nihil molestias fugiat sed quae enim commodi expedita soluta tempore molestiae fuga adipisci rem esse voluptates quos, ut quasi sunt ad a perspiciatis ducimus maxime animi. Adipisci officia doloribus magni alias maiores ab quo, eos mollitia sint esse. Labore odio, architecto nihil quaerat soluta blanditiis impedit laudantium esse officiis dolorum dolore libero, id sequi minima incidunt eum facilis itaque distinctio. Voluptas doloremque minus reiciendis ex beatae laudantium cum sequi repellat blanditiis molestiae. Cumque, libero nulla! Sit, quisquam magni dolore consectetur odio impedit adipisci voluptas ab, laboriosam autem nihil nam est ipsa excepturi obcaecati eos neque! Omnis similique qui veritatis. Repellat magni dolorem, facilis eaque, harum molestias, delectus est adipisci laudantium velit optio blanditiis debitis? Tenetur totam maiores animi officiis eligendi expedita nemo corrupti distinctio. Cum libero soluta beatae doloribus sit, repellendus nobis vel obcaecati velit dolorem voluptate magnam inventore quas pariatur quam reprehenderit molestiae hic sunt dicta illo amet quis magni accusamus sequi? Vel quis, dolores iusto suscipit excepturi laboriosam repellat consectetur! Maiores deserunt, pariatur nesciunt consequuntur recusandae minima assumenda consequatur inventore natus debitis illo velit voluptatum necessitatibus qui aspernatur illum impedit magni dignissimos ea, molestias tempora corporis, asperiores iusto possimus. Libero expedita aspernatur officia totam dolorum culpa, minus, alias adipisci eligendi suscipit voluptates, magnam laudantium? Inventore cupiditate perspiciatis mollitia excepturi, voluptatibus ducimus expedita provident. Dicta, odit. Odio, qui repudiandae! Maiores dignissimos, magnam deleniti reprehenderit ex cum ea eveniet placeat quae, ad at perspiciatis nobis corporis doloribus voluptatem nulla aliquam sunt accusamus facere quaerat necessitatibus ipsa! Nam quisquam dicta minima commodi nostrum. Exercitationem necessitatibus optio cumque voluptate modi amet consequuntur similique ex inventore explicabo doloremque esse sed sequi nemo rem, nostrum ullam. Totam repellat ut ipsa quisquam rem, nulla, suscipit debitis atque earum quis voluptates quaerat exercitationem architecto repellendus placeat, tenetur incidunt distinctio consectetur reiciendis minima officiis aliquam? Ipsum sequi hic officia iste a. Blanditiis, dicta! Eveniet molestias ut natus odio fugiat cum necessitatibus, architecto, quo a quisquam autem porro explicabo ipsam, nostrum deserunt possimus expedita eum est corporis quibusdam cupiditate! Fugiat, quaerat saepe. Harum modi eligendi beatae alias fugiat. Nostrum cum nisi saepe dicta iste cupiditate, deserunt omnis, doloremque a distinctio eum rem adipisci ab? Sapiente, dicta ipsam blanditiis earum omnis necessitatibus temporibus, excepturi accusantium delectus quo quod iusto ad aliquam nemo ducimus ab nobis inventore sequi veritatis? Nulla, dolorem. Voluptas, obcaecati non facilis repellendus ratione officiis veritatis, modi culpa rerum placeat voluptatum quia ex? Officia quos dolorum repellat deserunt voluptas praesentium.
        </ContentContainer>
      </main>
    </div>
  );
};



// ---------------------------------------------------------------
// ---------------------------------------------------------------


// MainContent.jsx
const MainContent = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] min-h-screen bg-[var(--base-clr)] text-[var(--text-clr)]">
      <Sidebar />
      <main className="p-[min(30px,7%)] md:p-8">
        {/* Section 1 */}
        <div className="border border-[var(--line-clr)] rounded-xl mb-6 p-[min(3em,15%)]">
          <h2 className="text-xl font-semibold mt-4">Hello World</h2>
          <p className="text-[var(--secondary-text-clr)] mt-2 mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            porro iure quaerat aliquam! Optio dolorum in eum provident, facilis
            error repellendus excepturi enim dolor deleniti adipisci consectetur
            doloremque, unde maiores odit sapiente. Atque ab necessitatibus
            laboriosam consequatur eius similique, ex dolorum eum eaque sequi id
            veritatis voluptates perspiciatis, cupiditate pariatur.
          </p>
        </div>

        {/* Section 2 */}
        <div className="border border-[var(--line-clr)] rounded-xl mb-6 p-[min(3em,15%)]">
          <h2 className="text-xl font-semibold mt-4">Example Heading</h2>
          <p className="text-[var(--secondary-text-clr)] mt-2 mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic aliquid
            corrupti, tenetur fuga magnam necessitatibus blanditiis quod sint
            excepturi laborum esse alias labore molestias adipisci, nostrum
            corporis ex maiores quis dolore quidem asperiores odio ad fugit eos!
            Delectus modi quas ipsa deleniti consequuntur nihil, hic in ipsum
            exercitationem blanditiis natus, expedita eos.
          </p>
        </div>

        {/* Section 3 */}
        <div className="border border-[var(--line-clr)] rounded-xl mb-6 p-[min(3em,15%)]">
          <h2 className="text-xl font-semibold mt-4">Lorem Ipsum</h2>
          <p className="text-[var(--secondary-text-clr)] mt-2 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            repudiandae labore veniam reprehenderit voluptatum, laboriosam
            perferendis fuga, dolore quam quas nostrum totam sunt esse expedita.
            Vero distinctio omnis accusantium. Quisquam ullam saepe cupiditate
            magni numquam totam perspiciatis error velit, debitis veniam labore
            possimus aut sunt, reiciendis natus. Impedit provident voluptatum
            nulla fuga error a magnam, corporis natus aperiam fugit quod
            perferendis quos quaerat, numquam sequi doloribus tenetur dolorem
            voluptate deleniti, odio minus…
          </p>
        </div>
      </main>
    </div>
  );
};

// export default App;
export default MainContent;