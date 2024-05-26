import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiCoupon3Fill, RiDashboardFill, RiShoppingBagFill } from 'react-icons/ri';
import { AiFillFileText, AiOutlineBarChart, AiOutlineLineChart, AiOutlinePieChart } from 'react-icons/ai';
import { IoIosPeople, IoLogoGameControllerB } from 'react-icons/io';

const AdminSidebar = () => {
  return (
    <aside>
      <h2 className='green'>Grow.</h2>
      <DivOne />
      {/* <DivTwo />
      <DivThree /> */}
    </aside>
  );
};

const DivOne = () => (
  <div>
    <h5>Dashboard</h5>
    <ul>
      <Li text="Dashboard" url="/admin/dashboard" Icon={RiDashboardFill} />
      <Li text="Products" url="/admin/products" Icon={RiShoppingBagFill} />
      <Li text="Customer" url="/admin/customers" Icon={IoIosPeople} />
      <Li text="Transaction" url="/admin/transaction" Icon={AiFillFileText} />
    </ul>
  </div>
);

const DivTwo = () => (
  <div>
    <h5>Charts</h5>
    <ul>
      <Li text="Bar" url="/admin/chart/bar" Icon={AiOutlineBarChart} />
      <Li text="Pie" url="/admin/chart/pie" Icon={AiOutlinePieChart} />
      <Li text="Line" url="/admin/chart/line" Icon={AiOutlineLineChart} />
    </ul>
  </div>
);

const DivThree = () => (
  <div>
    <h5>Apps</h5>
    <ul>
      <Li text="Coupon" url="/admin/app/coupon" Icon={RiCoupon3Fill} />
      <Li text="Snake Game" url="/admin/app/snake-game" Icon={IoLogoGameControllerB} />
    </ul>
  </div>
);

const Li = ({ url, text, Icon }) => {
  const location = useLocation();
  return (
    <li
      style={{
        backgroundColor: location.pathname.includes(url) ? 'rgba(0,115,255,0.1)' : 'white',
      }}
    >
      <Link
        to={url}
        style={{
          color: location.pathname.includes(url) ? 'rgba(0,115,255)' : 'black',
        }}
      >
        <Icon />
        {text}
      </Link>
    </li>
  );
};

export default AdminSidebar;
