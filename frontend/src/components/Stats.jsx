import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Stats = ({ stats }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  if (!stats || stats.length === 0) {
    return <h1 className="text-white text-center">Loading...</h1>;
  }

  return (
    <section ref={ref} className="bg-black py-14 px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, i) => (
          <div key={i} className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-3xl text-orange-500 font-bold">
              {inView && <CountUp end={item.value} duration={2} />}
              {item.suffix}
            </h2>
            <p className="text-gray-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;