import React, { useState, useRef, useCallback } from 'react'
import { Mail, Phone, Clock, Send, ChevronDown, MessageCircle, Instagram } from 'lucide-react'
import { supabase } from '../lib/supabase'
import BlurText from './effectsComponents/BlurText'
import { useTranslation } from 'react-i18next'

interface FormData {
	name: string
	email: string
	phone: string
	company: string
	sector: string
	message: string
	areas: string[]
}

const Contact: React.FC = () => {
	const { t } = useTranslation()
	const areasDeInteres = [
		{ id: 'automatizacion', label: t('contact.form.areas.options.automatizacion') },
		{ id: 'desarrollo', label: t('contact.form.areas.options.desarrollo') },
		{ id: 'crm', label: t('contact.form.areas.options.crm') },
		{ id: 'marketing', label: t('contact.form.areas.options.marketing') },
		{ id: 'infraestructura', label: t('contact.form.areas.options.infraestructura') },
		{ id: 'consultoria', label: t('contact.form.areas.options.consultoria') },
	]
	const faqs = [
		{
			question: t('contact.faq.faqs.0.question'),
			answer: t('contact.faq.faqs.0.answer'),
		},
		{
			question: t('contact.faq.faqs.1.question'),
			answer: t('contact.faq.faqs.1.answer'),
		},
		{
			question: t('contact.faq.faqs.2.question'),
			answer: t('contact.faq.faqs.2.answer'),
		},
		{
			question: t('contact.faq.faqs.3.question'),
			answer: t('contact.faq.faqs.3.answer'),
		},
		{
			question: t('contact.faq.faqs.4.question'),
			answer: t('contact.faq.faqs.4.answer'),
		},
	]
	const formRef = useRef<HTMLFormElement>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		company: '',
		sector: '',
		message: '',
		areas: [],
	})

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			const { name, value } = e.target
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}))
		},
		[],
	)

	const handleAreaChange = useCallback((areaId: string) => {
		setFormData((prev) => {
			const areas = prev.areas.includes(areaId) ? prev.areas.filter((id) => id !== areaId) : [...prev.areas, areaId]
			return { ...prev, areas }
		})
	}, [])

	const handleSubmit = useCallback(
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()

			if (!formRef.current || isSubmitting) return

			setIsSubmitting(true)

			try {
				// Insert data into Supabase
				const { error } = await supabase.from('contact_submissions').insert([
					{
						name: formData.name,
						email: formData.email,
						phone: formData.phone,
						company: formData.company,
						sector: formData.sector,
						areas: formData.areas.map((id) => areasDeInteres.find((area) => area.id === id)?.label || id),
						message: formData.message,
					},
				])

				if (error) {
					throw error
				}

				alert(t('contact.form.success'))

				setFormData({
					name: '',
					email: '',
					phone: '',
					company: '',
					sector: '',
					message: '',
					areas: [],
				})
			} catch (error) {
				console.error('Error al enviar el mensaje:', error)
				alert(t('contact.form.error'))
			} finally {
				setIsSubmitting(false)
			}
		},
		[formRef, isSubmitting, formData],
	)

	const openWhatsApp = useCallback(() => {
		const message = encodeURIComponent(t('contact.form.whatsapp.message'))
		window.open(`https://wa.me/584129974533?text=${message}`, '_blank')
	}, [])

	const handleFaqClick = useCallback((index: number) => {
		setOpenFaqIndex((prev) => (prev === index ? null : index))
	}, [])

	return (
		<section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="contacto">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<BlurText
						text={t('contact.title')}
						delay={150}
						animateBy="words"
						direction="top"
						className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
					/>
					<BlurText
						text={t('contact.description')}
						delay={200}
						animateBy="words"
						direction="bottom"
						className="text-xl text-gray-600 dark:text-gray-300"
					/>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
						<div className="mb-8">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
								{t('contact.form.title')}
							</h3>
							<p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
								{t('contact.form.description')}
							</p>
						</div>

						<form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									{t('contact.form.name.title')}
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									placeholder={t('contact.form.name.placeholder')}
									className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                    shadow-sm focus:border-blue-500 dark:focus:border-blue-400 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:bg-white dark:focus:bg-gray-600 transition-colors duration-300"
								/>
							</div>

							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									{t('contact.form.email.title')}
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									placeholder={t('contact.form.email.placeholder')}
									className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                    shadow-sm focus:border-blue-500 dark:focus:border-blue-400 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:bg-white dark:focus:bg-gray-600 transition-colors duration-300"
								/>
							</div>

							<div>
								<label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									{t('contact.form.phone.title')}
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									placeholder={t('contact.form.phone.placeholder')}
									className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                    shadow-sm focus:border-blue-500 dark:focus:border-blue-400 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:bg-white dark:focus:bg-gray-600 transition-colors duration-300"
								/>
							</div>

							<div>
								<label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									{t('contact.form.company.title')}
								</label>
								<input
									type="text"
									id="company"
									name="company"
									value={formData.company}
									onChange={handleChange}
									placeholder={t('contact.form.company.placeholder')}
									className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                    shadow-sm focus:border-blue-500 dark:focus:border-blue-400 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:bg-white dark:focus:bg-gray-600 transition-colors duration-300"
								/>
							</div>

							<div>
								<label htmlFor="sector" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									{t('contact.form.sector.title')}
								</label>
								<select
									id="sector"
									name="sector"
									value={formData.sector}
									onChange={handleChange}
									required
									className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                    shadow-sm focus:border-blue-500 dark:focus:border-blue-400 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:bg-white dark:focus:bg-gray-600 transition-colors duration-300 
                    appearance-none pr-10"
								>
									<option value="">{t('contact.form.sector.options.default')}</option>
									<option value="tecnologia">{t('contact.form.sector.options.tecnologia')}</option>
									<option value="salud">{t('contact.form.sector.options.salud')}</option>
									<option value="educacion">{t('contact.form.sector.options.educacion')}</option>
									<option value="comercio">{t('contact.form.sector.options.comercio')}</option>
									<option value="servicios">{t('contact.form.sector.options.servicios')}</option>
									<option value="otro">{t('contact.form.sector.options.otro')}</option>
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
									{t('contact.form.areas.title')}
								</label>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
									{areasDeInteres.map((area) => (
										<label
											key={area.id}
											className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
												formData.areas.includes(area.id)
													? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
													: 'border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
											}`}
										>
											<input
												type="checkbox"
												className="sr-only"
												checked={formData.areas.includes(area.id)}
												onChange={() => handleAreaChange(area.id)}
											/>
											<span className="text-sm">{area.label}</span>
										</label>
									))}
								</div>
							</div>

							<div>
								<label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
									{t('contact.form.message.title')}
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									required
									placeholder={t('contact.form.message.placeholder')}
									rows={4}
									className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                    bg-gray-50 dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                    shadow-sm focus:border-blue-500 dark:focus:border-blue-400 
                    focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:bg-white dark:focus:bg-gray-600 transition-colors duration-300"
								/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full flex items-center justify-center px-6 py-3 border border-transparent 
                  text-base font-medium rounded-full text-white bg-blue-600 dark:bg-blue-500 
                  hover:bg-blue-700 dark:hover:bg-blue-600 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                  transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<Send className="h-5 w-5 mr-2" />
								{isSubmitting ? t('contact.form.button.submitting') : t('contact.form.button.send')}
							</button>
						</form>
					</div>

					<div className="space-y-8">
						<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
							<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
								{t('contact.contactInf.title')}
							</h3>

							<div className="space-y-4">
								<div className="flex items-center">
									<Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									<a
										href="mailto:ventas@solware.agency"
										className="ml-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 
                      dark:hover:text-blue-400 transition-colors"
									>
										ventas@solware.agency
									</a>
								</div>

								<div className="flex items-center">
									<Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									<a
										href="tel:+584129974533"
										className="ml-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 
                      dark:hover:text-blue-400 transition-colors"
									>
										+58 412-9974533
									</a>
								</div>

								<div className="flex items-center">
									<Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									<span className="ml-3 text-gray-600 dark:text-gray-300">
										{t('contact.contactInf.days')}, 9:00 - 18:00 hrs
									</span>
								</div>

								<div className="flex items-center">
									<Instagram className="h-5 w-5 text-blue-600 dark:text-blue-400" />
									<a
										href="https://www.instagram.com/solware_?igsh=MTg4OTdwM3k3d2o4cA=="
										target="_blank"
										rel="noopener noreferrer"
										className="ml-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 
                      dark:hover:text-blue-400 transition-colors"
									>
										{t('contact.contactInf.ig')}
									</a>
								</div>

								<div className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-600 dark:text-blue-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.5c.69-.69 1.79-1.5 3-1.5 2.209 0 4 1.791 4 4v6z" />
									</svg>
									<a
										href="https://www.linkedin.com/company/agencia-solware/"
										target="_blank"
										rel="noopener noreferrer"
										className="ml-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 
                      dark:hover:text-blue-400 transition-colors"
									>
										{t('contact.contactInf.linkedin')}
									</a>
								</div>

								<div className="pt-4">
									<button
										onClick={openWhatsApp}
										className="w-full flex items-center justify-center px-6 py-3 
                      bg-green-500 dark:bg-green-600 text-white rounded-full 
                      hover:bg-green-600 dark:hover:bg-green-700 
                      transition-all duration-300 shadow-lg hover:shadow-xl"
									>
										<MessageCircle className="h-5 w-5 mr-2" />
										{t('contact.wspButton')}
									</button>
								</div>
							</div>
						</div>

						<div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
							<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
								{t('contact.faq.title')}
							</h3>

							<div className="space-y-4">
								{faqs.map((faq, index) => (
									<details
										key={index}
										className="group"
										open={openFaqIndex === index}
										onClick={(e) => {
											e.preventDefault()
											handleFaqClick(index)
										}}
									>
										<summary
											className="flex justify-between items-center cursor-pointer 
                      text-gray-700 dark:text-gray-300 hover:text-blue-600 
                      dark:hover:text-blue-400 transition-colors list-none"
										>
											<span>{faq.question}</span>
											<ChevronDown
												className={`h-5 w-5 transform transition-transform duration-500
                        ${openFaqIndex === index ? 'rotate-180' : ''}`}
											/>
										</summary>
										<div
											className="overflow-hidden transition-all duration-500 ease-in-out"
											style={{
												maxHeight: openFaqIndex === index ? '200px' : '0px',
												opacity: openFaqIndex === index ? 1 : 0,
												marginTop: openFaqIndex === index ? '0.5rem' : '0',
											}}
										>
											<p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
										</div>
									</details>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Contact
