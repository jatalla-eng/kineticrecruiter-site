import { Upload, FileStack, Mail } from 'lucide-react';

export default function FeatureIllustration6() {
  return (
    <div className="relative bg-lightGrey rounded-2xl p-6 md:p-8">
      {/* Input channels */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Upload */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-kinetic-teal/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-kinetic-teal" />
          </div>
          <p className="text-xs font-medium text-navy">Upload</p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX</p>
        </div>

        {/* Bulk */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-cyan/20 flex items-center justify-center">
            <FileStack className="w-6 h-6 text-cyan" />
          </div>
          <p className="text-xs font-medium text-navy">Bulk Import</p>
          <p className="text-xs text-gray-400 mt-1">Drag & drop</p>
        </div>

        {/* Email */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-amber/20 flex items-center justify-center">
            <Mail className="w-6 h-6 text-amber" />
          </div>
          <p className="text-xs font-medium text-navy">Email</p>
          <p className="text-xs text-gray-400 mt-1">Forward resumes</p>
        </div>
      </div>

      {/* Flow arrow */}
      <div className="flex justify-center mb-6">
        <svg className="w-8 h-16 text-kinetic-teal" viewBox="0 0 32 64" fill="none">
          <path d="M16 0V48M16 48L8 40M16 48L24 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Output - Structured Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-kinetic-teal/20 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-kinetic-teal flex items-center justify-center text-white text-lg font-bold">
            SM
          </div>
          <div>
            <p className="font-semibold text-navy">Sarah Mitchell</p>
            <p className="text-sm text-kinetic-teal">Parsed: 2 seconds ago</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs">Email</p>
            <p className="text-navy">sarah.mitchell@email.com</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Phone</p>
            <p className="text-navy">+61 4XX XXX XXX</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Location</p>
            <p className="text-navy">Melbourne, VIC</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Experience</p>
            <p className="text-navy">8+ years</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2">Skills extracted:</p>
          <div className="flex flex-wrap gap-2">
            {['Python', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes'].map((skill) => (
              <span key={skill} className="px-2 py-1 bg-kinetic-teal/10 text-kinetic-teal text-xs rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-violet/10 rounded-full blur-2xl" />
    </div>
  );
}
