// ─── TeamSection.jsx ─────────────────────────────────────────────────────────
// Team member cards with avatar, role, tags, and social links
// Usage: <TeamSection />

import { motion }     from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlowOrb        from "@/components/ui/GlowOrb";
import GridBg         from "@/components/ui/GridBg";
import TagPill        from "@/components/ui/TagPill";
import SectionBadge   from "@/components/ui/SectionBadge";
import SectionHeader  from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";

const TEAM = [
  {
    name:   "Wasiya",
    role:   "Full Stack & AI Engineer",
    desc:   "Final Year SE Student. Architected the complete AI pipeline, backend API, and all frontend dashboards.",
    avatar: "WA",
    color:  "#00f5ff",
    tags:   ["React", "FastAPI", "YOLOv8", "Node.js"],
    github: "#",
    linkedin: "#",
  },
  {
    name:   "Project Supervisor",
    role:   "Dr. S.M. Khalid Jamal",
    desc:   "Guided the AI model selection, system architecture design, and research methodology throughout the project.",
    avatar: "PS",
    color:  "#a855f7",
    tags:   ["AI/ML", "Research", "Architecture"],
    github: null,
    linkedin: "#",
  },
  {
    name:   "University Of Karachi",
    role:   "CS Department · Project 2026",
    desc:   "Project submitted to the Department of Computer Science as partial fulfillment of BSc SE.",
    avatar: "UNI",
    color:  "#3b82f6",
    tags:   ["Project 2026", "CS Department", "Academic Project"],
    github: null,
    linkedin: null,
  },
];

export default function TeamSection() {
  return (
    <SectionWrapper id="team" bg="darker">
      <GridBg />
      <GlowOrb color="#a855f7" size="500px" top="30%" left="10%" opacity={0.07} />

      <SectionHeader
        badge={
          <SectionBadge
            icon={<Icons.Users className="w-[13px] h-[13px]" />}
            label="The Team"
            color="#a855f7"
          />
        }
        title="Built with"
        gradientText="passion"
        gradientColors={["#a855f7", "#3b82f6"]}
      />

      <div className="grid md:grid-cols-3 gap-5">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative p-7 rounded-2xl cursor-default
                       text-center overflow-hidden
                       border border-white/[0.07] hover:border-white/[0.12]
                       bg-white/[0.02] transition-colors duration-300"
          >
            {/* hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0
                         group-hover:opacity-100 transition-opacity duration-500
                         pointer-events-none"
              style={{
                background: `radial-gradient(circle at center top,
                  ${member.color}07 0%, transparent 60%)`,
              }}
            />

            {/* avatar */}
            <div className="relative inline-block mb-5">
              <motion.div
                className="w-20 h-20 rounded-2xl flex items-center
                           justify-center text-xl font-black mx-auto"
                style={{
                  background: `${member.color}15`,
                  color:       member.color,
                  border:     `2px solid ${member.color}25`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 0px ${member.color}00`,
                    `0 0 30px ${member.color}30`,
                    `0 0 0px ${member.color}00`,
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {member.avatar}
              </motion.div>
            </div>

            <h3 className="text-white font-bold text-[16px] mb-1">
              {member.name}
            </h3>
            <p
              className="text-[12px] font-semibold mb-4"
              style={{ color: member.color }}
            >
              {member.role}
            </p>
            <p className="text-white/38 text-[13px] leading-[1.7] mb-5">
              {member.desc}
            </p>

            {/* tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-5">
              {member.tags.map((tag) => (
                <TagPill key={tag} label={tag} color={member.color} size="sm" />
              ))}
            </div>

            {/* social links */}
            <div className="flex justify-center gap-3">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/30 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Icons.Github className="w-4 h-4" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/30 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Icons.Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
