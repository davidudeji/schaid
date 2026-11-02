import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, CalendarDays,
  Check, CircleAlert, Clock3, CreditCard, Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  admissions, dashboardStats, expenseByMonth, revenueByMonth, timetable, transactions,
} from '../types/mockData';

const currency = new Intl.NumberFormat('en-GH', {
  style: 'currency',
  currency: 'GHS',
  maximumFractionDigits: 0,
});

function formatCompactCurrency(value: number) {
  return `GHS ${(value / 1_000_000).toFixed(2)}m`;
}

function formatTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(2026, 0, 1, hours, minutes));
}

function Metric({
  label,
  value,
  detail,
  trend,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  trend: 'up' | 'down' | 'steady';
  icon: React.ReactNode;
}) {
  const TrendIcon = trend === 'down' ? ArrowDownRight : ArrowUpRight;

  return (
    <article className="overview-metric">
      <div className="overview-metric-heading">
        <span>{label}</span>
        <span className="overview-metric-icon" aria-hidden="true">{icon}</span>
      </div>
      <strong className="overview-metric-value">{value}</strong>
      <div className="overview-metric-detail">
        {trend !== 'steady' && <TrendIcon size={14} aria-hidden="true" />}
        <span>{detail}</span>
      </div>
    </article>
  );
}

function RevenueChart() {
  const maxValue = Math.max(...revenueByMonth.map(({ value }) => value));

  return (
    <div className="overview-chart" role="img" aria-label="Monthly fee revenue and operating expenses from April to September">
      <div className="overview-chart-legend">
        <span><i className="legend-revenue" /> Fee revenue</span>
        <span><i className="legend-expenses" /> Expenses</span>
      </div>
      <div className="overview-chart-bars">
        {revenueByMonth.map(({ month, value }, index) => {
          const expense = expenseByMonth[index];
          return (
            <div className="overview-chart-month" key={month}>
              <div className="overview-chart-pair">
                <span
                  className="overview-bar overview-bar-revenue"
                  style={{ height: `${(value / maxValue) * 100}%` }}
                  title={`${month} fee revenue: ${currency.format(value)}`}
                />
                <span
                  className="overview-bar overview-bar-expenses"
                  style={{ height: `${((expense?.value ?? 0) / maxValue) * 100}%` }}
                  title={`${month} expenses: ${currency.format(expense?.value ?? 0)}`}
                />
              </div>
              <span className="overview-chart-label">{month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function admissionStatus(status: string) {
  return status.replace('_', ' ');
}

export default function Dashboard() {
  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good morning' : today.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const todayName = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(today);
  const todayDate = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(today);
  const todayClasses = timetable
    .filter(({ day }) => day === todayName)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
  const latestRevenue = revenueByMonth.at(-1)?.value ?? 0;
  const latestExpenses = expenseByMonth.at(-1)?.value ?? 0;

  return (
    <main className="page overview-page">
      <header className="overview-header">
        <div>
          <p className="overview-eyebrow">{todayDate}</p>
          <h1 className="overview-title">{greeting}, Dr. Osei.</h1>
          <p className="overview-intro">A considered view of what is happening across your institution.</p>
        </div>
        <Link className="overview-primary-action" to="/app/admin/admissions">
          Review admissions <ArrowRight size={15} />
        </Link>
      </header>

      <section className="overview-metrics" aria-label="Institution overview">
        <Metric
          label="Enrolled students"
          value={dashboardStats.totalStudents.toLocaleString()}
          detail="+124 this term"
          trend="up"
          icon={<Users size={17} />}
        />
        <Metric
          label="Active courses"
          value={dashboardStats.activeCourses.toString()}
          detail="Across all departments"
          trend="steady"
          icon={<BookOpen size={17} />}
        />
        <Metric
          label="Attendance today"
          value={`${dashboardStats.attendanceRate}%`}
          detail="+3.1% from last term"
          trend="up"
          icon={<Check size={17} />}
        />
        <Metric
          label="Fees outstanding"
          value={formatCompactCurrency(dashboardStats.pendingFees)}
          detail="Across current invoices"
          trend="down"
          icon={<CreditCard size={17} />}
        />
      </section>

      <section className="overview-primary-grid" aria-label="Academic and financial overview">
        <article className="overview-panel overview-revenue-panel">
          <div className="overview-panel-heading">
            <div>
              <p className="overview-eyebrow">Financial overview</p>
              <h2>Revenue &amp; expenses</h2>
            </div>
            <Link to="/app/finance/fees" className="overview-inline-link">
              Fee ledger <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overview-financial-totals">
            <div>
              <span>Revenue tracked</span>
              <strong>{formatCompactCurrency(dashboardStats.totalRevenue)}</strong>
            </div>
            <div>
              <span>Latest monthly revenue</span>
              <strong>{currency.format(latestRevenue)}</strong>
            </div>
            <div>
              <span>Latest monthly expenses</span>
              <strong>{currency.format(latestExpenses)}</strong>
            </div>
          </div>
          <RevenueChart />
        </article>

        <article className="overview-panel overview-schedule-panel">
          <div className="overview-panel-heading">
            <div>
              <p className="overview-eyebrow">Academic calendar</p>
              <h2>Today’s timetable</h2>
            </div>
            <Link to="/app/academic/timetable" className="overview-inline-link" aria-label="View full timetable">
              <CalendarDays size={16} />
            </Link>
          </div>
          {todayClasses.length > 0 ? (
            <ol className="overview-schedule-list">
              {todayClasses.map((entry) => (
                <li className="overview-schedule-item" key={entry.id}>
                  <div className="overview-schedule-time">
                    <span>{formatTime(entry.startTime)}</span>
                    <span>{formatTime(entry.endTime)}</span>
                  </div>
                  <div className="overview-schedule-course">
                    <strong>{entry.courseCode}</strong>
                    <span>{entry.courseTitle}</span>
                    <small>{entry.venue} · {entry.lecturer}</small>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div className="overview-empty">
              <CalendarDays size={20} />
              <p>No classes are scheduled for {todayName}.</p>
              <Link to="/app/academic/timetable">View the full timetable</Link>
            </div>
          )}
        </article>
      </section>

      <section className="overview-secondary-grid" aria-label="Recent institutional activity">
        <article className="overview-panel">
          <div className="overview-panel-heading">
            <div>
              <p className="overview-eyebrow">Admissions</p>
              <h2>Applications to review</h2>
            </div>
            <Link to="/app/admin/admissions" className="overview-count-link">
              {dashboardStats.pendingAdmissions} pending <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overview-list">
            {admissions.slice(0, 4).map((application) => (
              <div className="overview-list-row" key={application.id}>
                <div className="overview-list-main">
                  <strong>{application.applicantName}</strong>
                  <span>{application.courseApplied}</span>
                </div>
                <span className={`overview-status overview-status-${application.status}`}>
                  {admissionStatus(application.status)}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="overview-panel">
          <div className="overview-panel-heading">
            <div>
              <p className="overview-eyebrow">Fee collection</p>
              <h2>Recent payments</h2>
            </div>
            <Link to="/app/finance/payments" className="overview-inline-link">
              All payments <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overview-list">
            {transactions.slice(0, 4).map((transaction) => (
              <div className="overview-list-row" key={transaction.id}>
                <div className="overview-list-main">
                  <strong>{transaction.studentName}</strong>
                  <span>{transaction.gateway} · {transaction.date}</span>
                </div>
                <div className="overview-payment">
                  <strong>{currency.format(transaction.amount)}</strong>
                  <span className={`overview-payment-status overview-payment-${transaction.status}`}>
                    {transaction.status === 'success' ? <Check size={12} /> : transaction.status === 'pending' ? <Clock3 size={12} /> : <CircleAlert size={12} />}
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <footer className="overview-footer">
        <span>{dashboardStats.totalStaff} staff members · {dashboardStats.activeCourses} active courses</span>
        <Link to="/app/academic/grades">
          Average CGPA {dashboardStats.avgCGPA.toFixed(2)} <ArrowRight size={13} />
        </Link>
      </footer>
    </main>
  );
}
