import Image from "next/image";

const LoginPage = () => {
    return (
        <div className="grid grid-cols-2 h-full">   
        {/* ESQUERDA */}
        <div>
            <Image src="/logo.png" alt="Logo Finance AI" width={173} height={39} />
        <h1>
        Bem-vindo
        </h1>
        <p>
            A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.
        </p>
        </div>
        {/* DIREITA */}
            <div className="relative h-full w-full">
                <Image src="/login.png" alt="Faça Login" fill className="object-cover" />
            </div>
        </div>
    );
}
 
export default LoginPage;