import { Col, Row } from 'antd';
import DealsChart from '@/components/home/DealsChart';
import UpcomingEvents from '@/components/home/upcomingEvents';

export const Home = () => {
  return (
    <div>
      <Row
        gutter={[32, 32]}
        style={{
          marginTop: '32px',
        }}
      >
        <Col
          xs={24}
          sm={24}
          lg={8}
          style={{
            height: '460px',
          }}
        >
          <UpcomingEvents />
        </Col>
        <Col
          xs={24}
          sm={24}
          lg={8}
          style={{
            height: '460px',
          }}
        >
          <DealsChart />
        </Col>
      </Row>
    </div>
  );
};
