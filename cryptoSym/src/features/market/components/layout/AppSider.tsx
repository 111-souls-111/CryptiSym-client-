import { Layout, Card } from 'antd';
import styles from './AppSider.module.css'



export const AppSider = () => {


  return (
    <Layout.Sider width="25%" className={styles.sider} style={{background:"#000000"}}>
      <Card className={styles.siderCard}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Layout.Sider>
  );
};
