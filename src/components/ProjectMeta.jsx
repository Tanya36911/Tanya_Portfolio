import { eyebrowStyle, bodyStyle } from '../styles/caseStudyStyles'

export default function ProjectMeta({
  role,
  team,
  timeline,
  tools,
  context,
  status,
  sectionRef,
}) {
  const items = [
    { label: 'Role', value: role },
    { label: 'Team', value: team?.length ? team.join(', ') : 'Solo' },
    { label: 'Timeline', value: timeline },
    { label: 'Tools', value: tools.join(', ') },
    { label: 'Context', value: context },
    { label: 'Status', value: status },
  ]

  return (
    <section
      ref={sectionRef}
      style={{
        borderTop: '0.5px solid rgba(16,12,28,0.12)',
        background: 'var(--bg)',
        opacity: 0,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(28px, 4vw, 40px) clamp(24px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '24px 28px',
        }}
      >
        {items.map(({ label, value }) => (
          <div key={label}>
            <span style={{ ...eyebrowStyle, color: 'var(--text-dim)', marginBottom: 10 }}>
              {label}
            </span>
            <p style={{ ...bodyStyle, color: 'var(--text-muted)' }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
