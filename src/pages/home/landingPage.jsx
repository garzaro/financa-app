import Hero from "@/components/landing/hero.jsx";
import Service from "@/components/landing/service.jsx";
import About from "@/components/landing/about.jsx";
import Contact from "@/components/landing/contact.jsx";

/**
 * LandingPage (sem lógica de autenticação)
 * **/

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-white">
      <main>
        <>
          <Hero />
          <Service />
          <About />
          <Contact />
          {/*newsLetter*/}
        </>
      </main>
    </div>
  );
}



{/*CONTINUAR COM A PAGINA LOGADO, SE TIVER LOGADO MAIN NAO RENDERIZA, VER A QUESTAO DE TERNARIO COM HOME SE NAO TIVER LOGADO HOME NAO APARECE*/}
/**
 *  return (
 *     <div className="min-h-screen bg-white">
 *       <Navbar />
 *       <main>
 *         { isLogged ? (
 *           <>
 *             <Hero />
 *             <Service />
 *             <About />
 *             <Contact />
 *             {/*newsLetter
*           </>
*         ) :
(
* <Home/>
*
)
}
*       </main>
*
<Footer/>
*
</div>
*   )
;
 *
 * **/