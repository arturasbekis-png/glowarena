export function Services() {
  const services = [
    {
      title: 'Vaikų gimtadieniai',
      desc: 'Aktyvi šventė smėlyje su žaidimais ir pramogomis draugams.',
    },
    {
      title: 'Įmonių šventės',
      desc: 'Aktyvus ir kitoks įmonės renginys – smėlis, sportas, komandinės pramogos ir gera atmosfera.',
    },
  ];

  return (
    <section id="paslaugos" className="px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Paslaugos
          </p>

          <h2 className="text-5xl leading-none md:text-7xl">
            Viena arena.
            <br />
            Keli formatai.
          </h2>
        </div>

        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
          {services.map((service, index) => (
            <article key={service.title} className="bg-[#10131b] p-8 lg:p-10">
              <div className="mb-10 text-sm font-mono text-orange-500">
                0{index + 1}
              </div>

              <h3 className="mb-4 text-3xl">{service.title}</h3>

              <p className="text-sm leading-6 text-white/55">
                {service.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
