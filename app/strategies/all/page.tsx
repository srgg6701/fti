import CardShared from '@/components/cards/card-shared';
import { SectionData } from '@/components/sectionsWrapper/sectionData';

const allStrategies = [
  {
    brokerImg: 'binance.png',
    chartImg: 'home/top-performing/graph1.svg',
    brokerCode: 54354535342,
    brokerName: 'Binance',
    status: 'Successfully',
  },
  {
    brokerImg: 'roboforex.png',
    chartImg: 'home/top-performing/graph1.svg',
    brokerCode: 54354535341,
    brokerName: 'Roboforex',
    status: 'Verifying...',
  },
  {
    brokerImg: 'green-fur.png',
    chartImg: 'home/top-performing/graph1.svg',
    brokerCode: 54354535340,
    brokerName: 'Greenfur',
    status: 'Invalid password',
  },
];

export default function AllStrategies() {
  return (
    <div className="mt-[80px] mb-[56px] flex flex-col gap-[5rem]">
      <SectionData
        data={allStrategies}
        getKey={(d) => d.brokerImg}
        height={310}
        noHeader={true}
        renderItem={(d, i) => (
          <CardShared
            key={i}
            brokerCode={d.brokerCode}
            brokerImg={d.brokerImg}
            brokerName={d.brokerName}
            chartImg={d.chartImg}
            status={d.status}
          />
        )}
        rowClassName="w-full flex-wrap gap-y-2.5"
        seeAllHref="/top"
      />
    </div>
  );
}
